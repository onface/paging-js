!(function () {
var S = {}
__inline('./ajax.js')


    var eFastbootVersionSelect = document.getElementById('fastbootVersionSelect')
    S.ajax({
        type: 'get',
        url: "http://registry.npm.taobao.org/" + FASTBOOT.package.name,
        success:function(data){
            data = JSON.parse(data)
            var options = [
                '<option value="">latest</option>'
            ]
            for(var version in data.versions) {
                options.push('<option value="' + version + '">' + version + '</option>')
            }
            eFastbootVersionSelect.innerHTML = options.join('')
            eFastbootVersionSelect.onchange = function () {
                var version = this.value
                if (version !== "latest") {
                    version = version + '/'
                }
                location.href = FASTBOOT.package.homepage + version
            }
        }
    })
})();
