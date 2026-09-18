// ==UserScript==
// @name         Via墨水屏点触不漏字翻页
// @namespace    via.ink.page
// @version      1.1
// @description  专为Via浏览器在墨水屏上刷知乎、网页定制，点击屏幕下半部分翻页，自带2行字重叠区防止漏字
// @author       qindapao.com
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('click', function(e) {
        // 获取当前屏幕的高度
        var screenHeight = window.innerHeight || document.documentElement.clientHeight;
        // 设置想要的翻页重叠距离（单位：像素，100像素大约是2-3行字的距离，确保不漏字）
        var overlap = 100; 
        // 计算实际点击单次需要滚动的净距离
        var scrollDistance = screenHeight - overlap;

        // 获取用户点击屏幕的纵坐标位置
        var clickY = e.clientY;

        // 如果点击的是屏幕下半部分（大于屏幕高度的 60%）
        if (clickY > screenHeight * 0.6) {
            // 排除掉点击按钮、链接等正常交互，防止误触
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && e.target.closest('a') === null && e.target.closest('button') === null) {
                e.preventDefault();
                // 瞬间向下切屏滚屏，无平滑滑动动画，最适合墨水屏
                window.scrollBy({
                    top: scrollDistance,
                    behavior: 'instant' 
                });
            }
        }
        // 如果点击的是屏幕最顶上一小部分（小于屏幕高度的 20%），则往回翻页
        else if (clickY < screenHeight * 0.2) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && e.target.closest('a') === null && e.target.closest('button') === null) {
                e.preventDefault();
                window.scrollBy({
                    top: -scrollDistance,
                    behavior: 'instant'
                });
            }
        }
    }, { passive: false });
})();

