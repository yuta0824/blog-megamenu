// メディアクエリのブレークポイントを設定します。この値以下の画面幅をモバイルデバイスと見なします。
const breakPoint = 768;

// メガメニューを開閉するボタンのセレクターです。
const megaMenuButtons = document.querySelectorAll(".js-button-megaMenu");

// メニューが開いている状態を示すクラス名です。
const openClass = "is-open";

/**
 * デバイスがタッチ対応であるかを判断します。
 * @returns {boolean} タッチ対応の場合はtrue、そうでない場合はfalseを返します。
 */
const isTouchDevice = () => {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0 ||
		window.matchMedia("(pointer: coarse)").matches
	);
};

/**
 * デバイスがモバイルデバイスであるかを判断します（画面幅がbreakPoint以下の場合）。
 * @returns {boolean} モバイルデバイスの場合はtrue、そうでない場合はfalseを返します。
 */
const isMobileDevice = () => {
	return window.matchMedia(`(max-width: ${breakPoint}px)`).matches;
};

/**
 * メガメニューの開閉を制御するイベントハンドラです。
 * @param {Event} e - クリックイベントオブジェクトです。
 */
const menuToggleAction = (e) => {
	if (!isTouchDevice() && !isMobileDevice()) {
		return;
	}

	const button = e.currentTarget;
	const currentMegaMenu = button.closest(".js-megaMenu");
	const isOpened = currentMegaMenu.classList.contains(openClass);

	document.querySelectorAll(`.js-megaMenu.${openClass}`).forEach((megaMenu) => {
		if (megaMenu !== currentMegaMenu) {
			megaMenu.classList.remove(openClass);
		}
	});

	currentMegaMenu.classList.toggle(openClass, !isOpened);
};

// 各メガメニューボタンにクリックイベントハンドラを設定します。
megaMenuButtons.forEach((button) => {
	button.addEventListener("click", menuToggleAction);
});

/**
 * すべてのメガメニューを閉じる関数。
 */
const resetMegaMenu = () => {
	const megaMenus = document.querySelectorAll(".js-megaMenu");
	megaMenus.forEach((megaMenu) => {
		megaMenu.classList.remove(openClass);
	});
};

// 画面のリサイズイベントに応じて、特定の条件下でメガメニューをリセットする処理を設定します。
let resizeTimer;
window.addEventListener("resize", () => {
	const delayMs = 200; // リサイズイベント後のデバウンス時間（ミリ秒）
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		if (
			!isTouchDevice() &&
			window.matchMedia(`(min-width: ${breakPoint}px)`).matches
		) {
			resetMegaMenu();
		}
	}, delayMs);
});
