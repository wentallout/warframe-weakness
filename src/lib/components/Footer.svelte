<footer class="footer">
	<div class="footer__container u-container">
		<div class="footer__text">
			© {new Date().getFullYear()} Warframe Weakness. All rights reserved.
		</div>
		<a class="footer__link" href="https://github.com/wentallout">github.com/wentallout</a>
		<a
			class="footer__link"
			href="https://browse.wf/profile#account=6567713e04824463a50413a5&platform=pc&tab=fashion">
			My Warframe Profile</a>
		<a
			href="https://www.reddit.com/r/Warframe/comments/1l3jbku/updated_warframe_weakness_cheatsheet/">
			Inspired by ShuddupAndPlay</a>
	</div>
</footer>

<style>
	.footer {
		width: 100%;
		background: var(--background-100);
		padding-block: var(--space-m);
		margin-top: var(--space-2xl);
		color: var(--text-500);
		border-top: 1px solid var(--background-200);
	}
	.footer__container {
		display: flex;
		flex-direction: column;

		align-items: flex-start;
		padding: 0 var(--space-s);
		width: 100%;
		box-sizing: border-box;
		gap: var(--space-m);
	}

	.footer__link {
		display: block;
	}
</style>
