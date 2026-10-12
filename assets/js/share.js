// 微信朋友圈分享：微信没有网页分享接口，点击后弹出当前页面的二维码，用微信扫码后再分享到朋友圈
(function () {
    const button = document.querySelector(".js-wechat-share");
    const dialog = document.getElementById("wechatShare");
    const qrBox = document.getElementById("wechatShareQr");
    if (!button || !dialog || !qrBox) return;

    const QR_LIB = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    let libPromise = null;

    // 二维码库只在第一次点击时加载
    function loadQrLib() {
        if (window.QRCode) return Promise.resolve();
        if (!libPromise) {
            libPromise = new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = QR_LIB;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
        return libPromise;
    }

    button.addEventListener("click", () => {
        dialog.showModal();
        if (qrBox.hasChildNodes()) return;

        loadQrLib()
            .then(() => {
                new QRCode(qrBox, {
                    text: button.dataset.url,
                    width: 180,
                    height: 180,
                    correctLevel: QRCode.CorrectLevel.M
                });
            })
            .catch(() => {
                qrBox.textContent = button.dataset.url;
            });
    });

    dialog.querySelector(".js-wechat-close").addEventListener("click", () => dialog.close());

    // 点击弹窗外的遮罩也可关闭
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });
})();
