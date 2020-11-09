<template>
	<div class="bg-blue-500 h-screen">
		<div class="pt-24 h-full w-full z-0">
			<div
				class="container rounded-lg mx-auto px-8 py-8 w-1/3 z-10 relative bg-blue-200"
			>
				<h1 class=" text-2xl font-semibold pb-2 ">Sign Up</h1>
				<input
					type="email"
					class=" border-l-8 p-2 my-2 w-full border-blue-400"
					v-model="email"
					placeholder="Email"
				/>
				<input
					type="password"
					class=" border-l-8 p-2 my-2 w-full border-blue-400"
					v-model="password"
					placeholder="Password"
				/>
				<p>Select color theme:</p>
				<input
					v-model="theme"
					type="radio"
					id="pink"
					name="themeColor"
					value="pink"
				/>
				<label for="pink">Pink</label><br />
				<input
					v-model="theme"
					type="radio"
					id="green"
					name="themeColor"
					value="green"
				/>
				<label for="green">Green</label><br />
				<div class="flex">
					<button
						class=" border-2 border-opacity-25 outline-none shadow-lg font-semibold rounded p-1 mt-2 border-blue-800 bg-blue-400 hover:bg-blue-500"
						@click.prevent="signUp"
					>
						Sign Up
					</button>
					<div class="mt-3 pl-2">
						Already a member?
						<router-link class="text-blue-800 font-bold" to="/login"
							>Log In</router-link
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { auth, db } from "./main";

export default {
	data() {
		return {
			email: "",
			password: "",
			theme: "",
		};
	},
	methods: {
		signUp() {
			auth.createUserWithEmailAndPassword(this.email, this.password)
				.then(() => {
					db.collection("profiles")
						.doc(this.email)
						.set({ theme: this.theme })
						.then(() => {
							this.$router.push("login");
						});
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
