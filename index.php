<!DOCTYPE html>
<html lang="hu">

<head>
	<?php require_once "./components/imports.php"; ?>

	<link rel="stylesheet" href="stylesheets/index.css">
	<title>Kezdőlap</title>
</head>

<body>
	<?php require_once './components/header.php'; ?>
	<?php require_once "./components/sidebar.php"; ?>

	<main>
		<section id="content">
			<h1>
				<strong>
					Üdvözlünk a Lobby Search weboldalán<?php echo isset($_SESSION["username"]) ? ", kedves <span id='greet'>".$_SESSION["username"]."</span>" : "" ?>!
				</strong>
			</h1>
			<p>Találj ideális csapattársakat a kedvenc játékaidban</p>
			<p>
				Kezdd is el a keresést!
				<?php
					if (isset($_SESSION["username"])) {
				?>
				<span class="text-button"><a href="/finder.php">Csapattárs kereső</a></span>
				<?php
					} else {
				?>
				<span class="text-button" onclick="redirect('login.php')">Jelentkezz be</span>
				, vagy ha még nincs fiókod, akkor
				<span class="text-button" onclick="redirect('register.php')">regisztrálj</span>
				<?php
					}
				?>
			</p>
		</section>
	</main>

	<?php require_once "./components/footer.php"; ?>
</body>

</html>