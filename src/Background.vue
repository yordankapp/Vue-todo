<template>
	<div>
		<div
			class="absolute top-0 bg h-full w-full z-0"
			:class="value ? 'bg-pink' : 'bg-green'"
		></div>
		<button
			class="absolute top-0 right-0 mt-5 mr-5 p-1 text-white border rounded outline-none bg-opacity-50 font-semibold"
			:class="value ? 'bg-pink-500' : 'bg-green-500'"
			@click.prevent="changeThemeColor()"
		>
			Change theme
		</button>
		<button
			class="absolute top-0 right-0 mt-20 mr-5 p-1 text-white border rounded outline-none bg-opacity-50 font-semibold"
			:class="value ? 'bg-pink-500' : 'bg-green-500'"
			@click.prevent="logout()"
		>
			Log out
		</button>
	</div>
</template>

<script>
import { auth, db } from "./main";

export default {
	name: "Background",
	props: {
		value: Boolean,
		email: String,
	},
	methods: {
		changeThemeColor() {
			db.collection("profiles")
				.doc(this.email)
				.update({ theme: !this.value ? "pink" : "green" })
				.then(() => {
					this.$emit("input", !this.value);
				});
		},
		logout() {
			auth.signOut().then(() => {
				this.$router.push("login");
			});
		},
	},
};
</script>

<style scoped>
.bg-pink {
	background-image: url("./assets/flower-purple.jpg");
	background-size: cover;
}

.bg-green {
	background-image: url("./assets/bg-green.jpg");
	background-size: cover;
}
</style>
