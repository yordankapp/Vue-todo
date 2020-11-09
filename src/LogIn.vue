<template>
	<div class="bg-blue-500 h-screen">
		<div class="pt-24 h-full w-full z-0">
			<div
				class="container rounded-lg mx-auto px-8 py-8 w-1/3 z-10 relative bg-blue-200"
			>
				<h1 class=" text-2xl font-semibold pb-2 ">Log In</h1>
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
				<div class="flex">
					<button
						class=" border-2 border-opacity-25 outline-none shadow-lg font-semibold rounded p-1 mt-2 border-blue-800 bg-blue-400 hover:bg-blue-500"
						@click.prevent="logIn"
					>
						Log In
					</button>
					<div class="mt-3 pl-2">
						Not a member?
						<router-link
							class="text-blue-800 font-bold"
							to="/signup"
							>Sign up</router-link
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { auth } from "./main";
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		logIn() {
			auth.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push("todo");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
