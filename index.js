// ==UserScript==
// @name         毕设系统文件上传修复工具
// @namespace    https://www.fenyu.club/
// @version      0.1
// @description  毕设系统文件上传修复适配性工具
// @author       纷羽
// @match        http://wls5.neusoft.edu.cn/ptms/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById('file_upload').addEventListener('change', function (event) {
        console.log(event)
        try {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHttpRequest");
            } else {
                return
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    const result = JSON.parse(xhr.responseText);
                    if (result.success == true) {
                        onFileUploadSuccess(xhr.responseText);
                        alert("文件上传成功!");
                    } else {
                        alert("操作失败");
                    }
                }
            };

            var form = new FormData();
            form.append('file', event.target.files[0])
            form.append('consid', fileconsid)

            var uploadUrl = stmpath + '/file/upload.do';

            xhr.withCredentials = false;
            xhr.open("POST", uploadUrl, true);
            xhr.send(form);
        } catch (err) {
            console.error(err)
        }
    })
})();
