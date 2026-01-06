# CSS 训练场

欢迎来到 CSS 训练场

想法：

1. 不想写css，只想写sass

   实现：node.js监听某一个demo的文件变化。

   比如说：

   监听styles.scss，如果它发生变化则调用sass的api编译该文件成css文件，然后再通过postcss.config.js的编译成最终的css产物，这两个产物都保留在当前目录下的一个target目录中（结束后可以选择性把中间的产物删除）

2. 不想写css和sass，只想写unocss

   

3. 不想写javascript，只想写typescript

上面的实现都需要编译，能不能做一个单个编译或者全量编译呢？