const delay = function delay (done, queue) {
    let run = function (queue, index) {
        setTimeout(function next () {
            queue[index](function () {
                console.log('------------(' + queue[index].name + ':' + index + ')--------------')
                if (index + 1 === queue.length) {
                    done()
                }
                else {
                    index = index + 1
                    run(queue, index)
                }
            })
        }, 0)
    }
    run(queue,0)
}
export { delay }
