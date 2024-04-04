	<script>
		// let isTouchDevice;
		// let isMobileDevice;

		// function updateDeviceStatus() {
		// 	isTouchDevice =
		// 		"ontouchstart" in window ||
		// 		navigator.maxTouchPoints > 0 ||
		// 		window.matchMedia("(pointer:coarse)").matches;

		// 	isMobileDevice = window.matchMedia("not (min-width: 768px)").matches;

		// 	// デバイスステータスが更新されるたびに、タッチまたはモバイルデバイスの検出関数を呼び出す
		// 	detectTouchAndMobileDevices();
		// }

		// function detectTouchAndMobileDevices() {
		// 	if (isTouchDevice || isMobileDevice) {
		// 		document.documentElement.classList.add("is-touch-or-mobile");
		// 	} else {
		// 		document.documentElement.classList.remove("is-touch-or-mobile");
		// 	}
		// }

		// let resizeTimer;
		// window.addEventListener("resize", () => {
		// 	const delayMs = 200;
		// 	clearTimeout(resizeTimer);
		// 	// resizeイベントでデバイスステータスを更新する
		// 	resizeTimer = setTimeout(updateDeviceStatus, delayMs);
		// });

		// // ページの読み込み時に一度、デバイスステータスと検出関数を実行する
		// updateDeviceStatus();

		const initMegaMenu = () => {
			const megaMenuButtons = document.querySelectorAll(".js-button-megaMenu");

			// メニューのトグルイベント
			const menuToggleAction = (e) => {
				console.log("クリック");
				const target = e.currentTarget; // 現在のイベントターゲットを取得
				const expanded = target.getAttribute('aria-expanded') === 'true';
				target.setAttribute('aria-expanded', String(!expanded));
				target.classList.toggle("is-open"); // is-openクラスのtoggle
			};

			// 全デバイス共通でクリックイベントを設定
			megaMenuButtons.forEach(button => {
				button.addEventListener("click", menuToggleAction);
			});
		};

		// ページの読み込み時に初期化
		initMegaMenu();

	</script>
