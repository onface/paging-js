import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        prefixClassName: 'paging-js-onface',
        themes: ''
    }
    app.propTypes = {
        prefixClassName: p.string,
        themes: p.string
    }
}
