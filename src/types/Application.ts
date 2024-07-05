export default interface Application {
    name: string,
    desc?: string,
    avatar?: string,
    index?: number,
    localIsInstalled: boolean, // 本地是否已经安装
    cloudIsInstalled?: boolean, // 云上是否已经安装
    localType?: number,// 1 win; 2 mac; 3 iphone/ipad; 4 android
    webUrl?: string,
}