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
 * body要素に適切なクラスを追加または削除します。
 * タッチデバイスまたはモバイルデバイスである場合は `is-touch-or-mobile` を追加し、
 * そうでない場合は `is-touch-or-mobile` を削除して `is-pc` を追加します。
 */
const updateBodyClass = () => {
  if (isTouchDevice() || isMobileDevice()) {
    document.body.classList.add("is-touch-or-mobile");
    document.body.classList.remove("is-pc");
  } else {
    document.body.classList.remove("is-touch-or-mobile");
    document.body.classList.add("is-pc");
  }
};

// 初期読み込み時にもクラスを更新
updateBodyClass();

/**
 * メガメニューの開閉を制御するイベントハンドラです。
 * @param {Event} e - クリックイベントオブジェクトです。
 */
const menuToggleAction = (e) => {
  const button = e.currentTarget;
  const currentMegaMenu = button.closest(".js-megaMenu");
  const isOpened = currentMegaMenu.classList.contains(openClass);

  // 他のメガメニューを閉じる処理
  document.querySelectorAll(`.js-megaMenu.${openClass}`).forEach((megaMenu) => {
    if (megaMenu !== currentMegaMenu) {
      megaMenu.classList.remove(openClass);
      // 他のボタンのaria-expanded属性をfalseに設定
      megaMenu
        .querySelector(".js-button-megaMenu")
        .setAttribute("aria-expanded", "false");
    }
  });

  // 現在のメガメニューの開閉状態を切り替え
  currentMegaMenu.classList.toggle(openClass, !isOpened);

  // aria-expanded属性の値を現在の状態に応じて設定
  button.setAttribute("aria-expanded", String(!isOpened));
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

/**
 * ウィンドウのリサイズイベントが発生したときに実行されます。
 * デバウンス機能により、イベントの発生から一定時間（200ミリ秒）後に以下の処理を行います：
 *   1. `updateBodyClass`関数を実行して、デバイスの種類や画面のサイズに応じてbody要素のクラスを更新します。
 *   2. デバイスがタッチデバイスではなく、かつ画面の幅が指定されたブレークポイント以上である場合に、
 *      メガメニューをリセットする処理を実行します。
 */
let resizeTimer;
window.addEventListener("resize", () => {
  const delayMs = 200; // リサイズイベント後のデバウンス時間（ミリ秒）
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // updateBodyClass関数の呼び出し
    updateBodyClass();

    // メガメニューのリセット条件を確認して、条件に合致する場合はリセットを実行
    if (
      !isTouchDevice() &&
      window.matchMedia(`(min-width: ${breakPoint}px)`).matches
    ) {
      resetMegaMenu();
    }
  }, delayMs);
});
