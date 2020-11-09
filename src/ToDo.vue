<template>
	<div v-if="isThemePink != null" class="mt-24">
		<Background
			v-model="isThemePink"
			v-bind:email="this.email"
		></Background>
		<div
			class="container rounded-lg mx-auto px-8 py-8 w-1/3 z-10 relative"
			:class="isThemePink ? 'bg-pink-200' : 'bg-green-200'"
		>
			<h1 class=" text-2xl font-semibold p-2 ">To Do</h1>
			<div class="flex">
				<input
					@keypress.enter="addToDo()"
					class=" border-l-8 p-2 m-2 w-full"
					:class="
						isThemePink ? 'border-pink-400' : 'border-green-400'
					"
					v-model="input"
					placeholder="What needs to be done"
				/>
				<button
					class=" border-2 border-opacity-25 outline-none shadow-lg font-semibold rounded p-1 m-2"
					:class="
						isThemePink
							? 'border-pink-800 bg-pink-400 hover:bg-pink-500'
							: 'border-green-800  bg-green-400 hover:bg-green-500'
					"
					v-on:click="addToDo()"
				>
					Add
				</button>
			</div>
			<ul class="mt-2 overflow-y-auto max-h-screen-48">
				<div class="flex m-2 " v-for="todo in todos" :key="todo.id">
					<li
						class=" bg-white w-full border-l-8 mr-1 p-1 hover:bg-gray-200 break-words overflow-auto"
						:class="[
							todo.completed ? 'is-selected' : '',
							isThemePink
								? 'border-pink-400'
								: 'border-green-400',
						]"
					>
						{{ todo.task }}
					</li>
					<button
						class="button text-green-800"
						:class="todo.completed ? 'bg-green-500' : 'bg-white'"
						@click.prevent="completeToDo(todo.updated_at)"
					>
						✓
					</button>
					<button
						class="button bg-red-600 text-red-800"
						@click="removeToDo(todo.updated_at)"
					>
						✖
					</button>
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
import Background from "./Background.vue";
import { auth, db } from "./main";

export default {
	name: "App",
	components: { Background },
	data() {
		return {
			todos: [],
			input: "",
			isThemePink: null,
			email: "",
		};
	},
	created() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.email = user.email;
				this.getTodos();
				db.collection("profiles")
					.doc(user.email)
					.get()
					.then((profile) => {
						this.isThemePink = profile.get("theme") == "pink";
					});
			} else {
				this.$router.push({ path: "/login" });
			}
		});
	},
	methods: {
		getTodos() {
			db.collection("todos")
				.where("profile_id", "==", this.email)
				.get()
				.then((todos) => {
					function compare(a, b) {
						if (a.updated_at < b.updated_at) {
							return -1;
						}
						if (a.updated_at > b.updated_at) {
							return 1;
						}
						return 0;
					}
					this.todos = todos.docs
						.map((todo) => todo.data())
						.sort(compare);
				});
		},
		addToDo() {
			if (this.input) {
				const newTodo = {
					profile_id: this.email,
					task: this.input,
					completed: false,
					updated_at: new Date().toISOString(),
				};
				db.collection("todos")
					.add(newTodo)
					.then(() => {
						this.input = "";
						this.todos.push(newTodo);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		removeToDo(updated_at) {
			db.collection("todos")
				.where("updated_at", "==", updated_at)
				.get()
				.then((todos) => {
					todos.docs[0].ref.delete().then(() => {
						this.todos = this.todos.filter((todo) => {
							return todo.updated_at !== updated_at;
						});
					});
				});
		},
		completeToDo(updated_at) {
			var i = this.todos.findIndex((todo) => {
				return todo.updated_at == updated_at;
			});
			db.collection("todos")
				.where("updated_at", "==", updated_at)
				.get()
				.then((todos) => {
					todos.docs[0].ref
						.update({ completed: !this.todos[i].completed })
						.then(() => {
							this.todos[i].completed = !this.todos[i].completed;
							var audio = new Audio(
								require("./assets/eraseronpaper-206-sound-effect-567627.mp3")
							);
							audio.play();
						});
				});
		},
	},
};
</script>

<style scoped>
.is-selected {
	text-decoration: line-through;
}
.button {
	@apply m-auto mr-1 border border-pink-900 border-opacity-25 w-8 h-6 rounded-full shadow-lg bg-opacity-50 outline-none;
}
</style>
