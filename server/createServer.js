const PORT = process.env.PORT || 8080

export default function createServer(app, port) {
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT} / Pid Worker ${process.pid}`)
    })
}