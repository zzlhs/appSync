const information = document.getElementById('info')

information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`
console.log("2222222222222222", versions)


const func = async () => {
    const response = await window.versions.ping()
    console.log("333333333333333", response) // 打印 'pong'
}

func()