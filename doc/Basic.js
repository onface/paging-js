var React = require('react')
var Pagi = require('paging')
class Basic extends React.Component {
    render () {
        return (
            <div className="basicDemo" >
                <Button>default</Button>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
