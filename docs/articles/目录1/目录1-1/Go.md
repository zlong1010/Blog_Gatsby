#### 代码

```go
type Color byte
strings := []string {"WHITE", "BLACK", "BLUE", "RED", "YELLOW"}

type Box struct {
  width, height, depth float64
  color Color
}

type BoxList []Box //a slice of boxes

// 类似构造函数
boxes := BoxList {
  Box{4, 4, 4, RED},
  Box{10, 10, 1, YELLOW},
  Box{1, 1, 20, BLACK},
  Box{10, 10, 1, BLUE},
  Box{10, 30, 1, WHITE},
  Box{20, 20, 20, YELLOW},
}

type Interface interface {
	sort.Interface //嵌入字段sort.Interface
	Push(x interface{}) //a Push method to push elements into the heap
	Pop() interface{} //a Pop elements that pops elements from the heap
}

list := make(List, 3) // list 是类型
list[0] = 1 //an int
list[1] = "Hello" //a string
list[2] = Person{"Dennis", 70}

// 匿名字段赋值
respData := struct {
  FrontAppInfo
  CurProxyId string
} {
  FrontAppInfo: GetFrontAppById(data.AppId),
  CurProxyId: data.Id,
}
```

> 上面的代码通过文字描述出来之后是不是很简单？我们一般解决问题都是通过问题的描述，去写相应的代码实现。

#### 概念

> - 类型没有层级
> - Go程序是通过`package`来组织的
> - 引用传递 & 值传递
>   - 值传递--> 副本
> - 匿名字段
> - 变量有哪些类型
>   - interface 变量

#### 环境配置

- GOROOT
- GOPATH
- **根据package是main还是其他来决定，main的话就是可执行应用，其他的话就是应用包 ？**
- 建议package的名称和目录名保持一致

#### 基本语法

- 定义变量：`const`、`var`、`func`
- 无论什么定义方式，类型都紧跟着变量名。

```go
//定义三个类型都是“type”的变量
var vname1, vname2, vname3 string

var vname1, vname2, vname3 string= v1, v2, v3
```

- `:=`  是 `var` 和 类型的简写。
- 大写字母开头的变量是可导出的，也就是其它包可以读取的，是公有变量；小写字母开头的就是不可导出的，是私有变量。
- 大写字母开头的函数也是一样，相当于`class`中的带`public`关键词的公有函数；小写字母开头的就是有`private`关键词的私有函数。

#### 修改字符串

```go
s := "hello"
c := []byte(s)  // 将字符串 s 转换为 []byte 类型
c[0] = 'c'
s2 := string(c)  // 再转换回 string 类型

// 或者
s := "hello"
s = "c" + s[1:] // 字符串虽不能更改，但可进行切片操作
```

#### 数组 & slice

> 定义数组：var list [4]string
>
> 定义 slice：var slice []string
>
> slice: 动态数组， `slice`是引用类型，所以当引用改变其中元素的值时，其它的所有引用都会改变该值

**定义数组：** 

```go
var arr = [3]byte{'s', 'c', 'a'}
```



数组之间的赋值是值的赋值，即当把一个数组作为参数传入函数的时候，传入的其实是该数组的副本，而不是它的指针。如果要使用指针，那么就需要用到后面介绍的`slice`类型了。



`append` 函数会改变 `slice` 所引用的数组的内容，从而影响到引用同一数组的其它`slice`。 但当`slice`中没有剩余空间（即`(cap-len) == 0`）时，此时将动态分配新的数组空间。返回的`slice`数组指针将指向这个空间，而原数组的内容将保持不变；其它引用此数组的`slice`则不受影响。

#### map

- 定义

```go
// 初始化一个字典
rating := map[string]float32{"C":5, "Go":4.5, "Python":4.5, "C++":2 }
// map有两个返回值，第二个返回值，如果不存在key，那么ok为false，如果存在ok为true
csharpRating, ok := rating["C#"]
```

- 遍历


```go
for k,v:=range map {
	fmt.Println("map's key:",k)
	fmt.Println("map's val:",v)
}
```

#### struct & interface

> 使用 type 声明新的类型，类似别名

```go
type age int

type Human struct {
	name string
	age int
	phone string
}

// 定义interface
type Men interface {
	SayHi()
	Sing(lyrics string)
	Guzzle(beerStein string)
}
```

> interface 类似泛型

interface就是一组抽象方法的集合。

interface 是一个抽象的概念，描述 method签名集合(不是具体的 method)，通过interface来定义对象的一组行为。描述行为而不是属性。

最终的效果是可以把不同类型的值赋给同一个变量。这个变量定义为 interface ，“不同类型的值”这些值必须实现这个interface。

interface的变量可以持有任意实现该interface类型的对象。



**空 interface ** 

```go
type IEmpty interface {}
var a interface{}
var x struct {
  name string
}
```

所有的类型都实现了空interface。空interface对于描述起不到任何的作用(因为它不包含任何的method），但是空interface在我们需要存储任意类型的数值的时候相当有用，因为它可以存储任意类型的数值。

任何实现了String方法的类型都能作为参数被fmt.Println调用。

```go
package main

	import (
		"fmt"
		"strconv"
	)

	type Element interface{}
	type List [] Element

	type Person struct {
		name string
		age int
	}

	//定义了String方法，实现了fmt.Stringer
	func (p Person) String() string {
		return "(name: " + p.name + " - age: "+strconv.Itoa(p.age)+ " years)"
	}

	func main() {
		list := make(List, 3)
		list[0] = 1 // an int
		list[1] = "Hello" // a string
		list[2] = Person{"Dennis", 70}

		for index, element := range list {
			if value, ok := element.(int); ok {
				fmt.Printf("list[%d] is an int and its value is %d\n", index, value)
			} else if value, ok := element.(string); ok {
				fmt.Printf("list[%d] is a string and its value is %s\n", index, value)
			} else if value, ok := element.(Person); ok {
				fmt.Printf("list[%d] is a Person and its value is %s\n", index, value)
			} else {
				fmt.Printf("list[%d] is of a different type\n", index)
			}
		}
	}
```



[参考](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/02.6.md) 

#### 函数

> - 函数可以返回多个值
> - 当我们传一个参数值到被调用函数里面时，实际上是传了这个值的一份copy，当在被调用函数中修改参数值的时候，调用函数中相应实参不会发生任何变化，因为数值变化只作用在copy上。
> - 函数签名：func (r ReceiverType) funcName(parameters) (results)

- 操作地址

  ```go
  func add1(a *int) int { // 请注意，
  	*a = *a+1 // 修改了a的值
  	return *a // 返回新值
  }
  
  func main() {
  	x := 3
  	x1 := add1(&x)  // 调用 add1(&x) 传x的地址
  	fmt.Println("x+1 = ", x1) // 应该输出 "x+1 = 4"
  	fmt.Println("x = ", x)    // 应该输出 "x = 4"
  }
  ```

  - `&` 取变量的地址，`*` 取地址中存的值。
  - Go语言中`channel`，`slice`，`map`这三种类型的实现机制类似指针，所以可以直接传递，而不用取地址后传递指针。（注：若函数需改变`slice`的长度，则仍需要取地址传递指针）

- [函数作为值传递](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/02.3.md#%E5%87%BD%E6%95%B0%E4%BD%9C%E4%B8%BA%E5%80%BC%E7%B1%BB%E5%9E%8B) 

  - 所有的值都需要声明类型，使用 type 声明新的类型

    ```go
    type typeName func(input1 inputType1 , input2 inputType2 [, ...]) (result1 resultType1 [, ...])
    ```

#### [面向对象](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/02.5.md#25-%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1)  

> - `method`是附属在一个给定的类型上的
>
> - 通过这些内容，我们可以设计出基本的面向对象的程序了，但是Go里面的面向对象是如此的简单，没有任何的私有、公有关键字，通过大小写来实现(大写开头的为公有，小写开头的为私有)，方法也同样适用这个原则。
> - 如果一个method的receiver是*T,你可以在一个T类型的实例变量V上面调用这个method，而不需要&V去调用这个method
> - 如果一个method的receiver是T，你可以在一个*T类型的变量P上面调用这个method，而不需要 *P去调用这个method

```go
// func (r ReceiverType) funcName(parameters) (results)
func (r Rectangle) area() float64 {
	return r.width*r.height
}

r1 := Rectangle{12, 2}
r1.area()
```



方法的Receiver是以值传递，而非引用传递，是的，Receiver还可以是指针, 两者的差别在于, 指针作为Receiver会对实例对象的内容发生操作,而普通类型作为Receiver仅仅是以副本作为操作对象,并不对原实例对象发生操作。

想要修改一个对象的值，就要使用指针传递。



#### 内存

- new 返回指针