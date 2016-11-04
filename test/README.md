# test

<div id="mocha"></div>

<script src="/doc/vendor/expect.js/0.2.0/expect.js"></script>
<script src="/doc/vendor/mocha/3.0.2/mocha.js" ></script>
<script src="/doc/vendor/react/0.14.8/react-with-addons.js" ></script>

<script>mocha.setup('bdd')</script>


<!--
{
    "markrun_lastrun": false
}
-->
````js
// 在此处使用 markrun 导出模块到全局变量，供 test/**.js 使用
window._Package = require('<%= name %>')
````

<script src="./basic.js" ></script>

<script>
  mocha.checkLeaks();
   mocha.globals(['LiveReload', '_Package', 'FASTBOOT']);
  mocha.run();
</script>

<link rel="stylesheet" href="/doc/vendor/mocha/3.0.2/mocha.css">
