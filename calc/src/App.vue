<template>
		<div class="layout">
			<Layout>
				<Header>
					<Menu mode="horizontal" theme="dark" active-name="1">
						<h2 :style="{color: '#ffffff'}">Electric Submeter Bill Calculator</h2>
					</Menu>
				</Header>
				<Layout :style="{padding: '0 24px 24px', minHeight: '90vh'}">
					<Content :style="{maxWidth: '900px', padding: '24px', margin: '0 auto', background: '#fff', minHeight: '50vh'}">
						<router-view></router-view>
					</Content>
				</Layout>
			</Layout>
		</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.ivu-menu-dark {
	width: 900px;
	margin: 0px auto;
}
</style>
