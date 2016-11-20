# test

<!--MARKRUN-HTML

<div id="mocha"></div>

<script src="/doc/vendor/expect.js/0.2.0/expect.js"></script>
<script src="/doc/vendor/mocha/3.0.2/mocha.js" ></script>

<script>mocha.setup('bdd')</script>
-->

<!--
{
    "markrun_lastrun": false
}
-->
````js
window.console = window.console || {}
window.console.log = window.console.log || window.alert
window.console._warnMsg = ''
var warn = window.console.warn
// proxy console.wran
window.console.warn = function (msg) {
    window.console._warnMsg = msg
    warn(msg)
}
// 在此处使用 markrun 导出模块到全局变量，供 test/**.js 使用
window._Package = require('paging')
````
<!--MARKRUN-HTML

<script src="./createData.js" ></script>

<script>
  mocha.checkLeaks();
   mocha.globals(['LiveReload', '_Package', 'FASTBOOT']);
  mocha.run();
</script>


<link rel="stylesheet" href="/doc/vendor/mocha/3.0.2/mocha.css">
-->
