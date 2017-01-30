#JavaScript Date Format

通过格式规则对日期时间的数据进行格式化，显示更加友好并且自由组合的方式。

***声明：从 v0.9.7 开始我将对外的接口进行了更改，并且增加了一个新的接口[`lang`](#加载语言包)。如果你在之前使用过，则需要你找到你相关代码处，将引用的代码改为这样：`require('dateFormat').dateFormat`。对此破坏性更新我感到抱歉，当然如果你并不需要为不同的语言设置的话则完全没有必要进行升级，另外你也可以通过修改源代码的方式对语言进行设置。因此升级并不是必须的途径。再次抱歉。谢谢你的使用！***
	
eg.

	yyyy-mm-dd  => 2017-01-24
	mm/dd/yyyy  => 01/24/2017
	YYYY        => 二〇一七（年）
	YY          => 一七（年）
	MMMM        => 十一（月）
	DDDD        => 二十四（日）
	W           => （周）二
	HH:MM:ss    => 16:24:56    （24小时制）
	hh:MM:ss    => 04:24:56    （12小时制）
	
###Usage

```js
var dateFormat = require('dataFormat').dateFormat;
console.log(dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'));
// 2017/01/24 16:24:56

console.log(dateFormat(new Date(), '星期W HH:MM:ss mm/dd/yyyy'));
// 星期二 16:24:56 01/24/2017

console.log(dateFormat(new Date(), 'YYYY年MMMM月DDDD日 H点M分s秒'));
// 二〇一七年一月二十四日 16点24分56秒
```
自由组合，就是这么简单。

###特殊的格式规则`Ln-`

n 表示从1到6的级别，各自对应：秒，分钟，小时，天，月，年

使用此格式表示对于小于等于指定级别的时间将显示为近时值，比如当前时间为2017年1月24日16点32分，
如果将2017年1月24日16时30分的日期用`L2-yyyy/mm/dd`格式规则进行转换那么得出的结果是显示`2分钟前`，如果我们将 L2 改成 L1 那么此处将会按后面的`yyyy/mm/dd`显示`2017/01/24`。

通过这个规则可以让你轻松获得 多少秒前、多少分钟前 的友好体验，并且不用担心时间近值超过级别之后会被显示成比如 26小时前 这种乌龙日期。

eg.

```js
var dateFormat = require('dateFormat').dateFormat;
console.log(dateFormat(new Date('2017/01/24 16:30'), 'L2-yyyy-mm-dd'));
// 2分钟前 or 2017-01-24
```

###加载语言包

> 0.9.7+

考虑到一个国际化的问题，也许进行的项目并不一定都是中文环境，比如说做的国外项目也不是不可能。

因此添加了一个新的开放接口，用来设置不同的语言（默认中文）。现在你可以使用英文的月份，周几等英文文字的日期描述。
规则使用的是大写的标识按照示例里显示中文的一样就可以了。
	
```js
var setLang = require('dateFormat').lang;
var langObject = require('lang');
setLang(langObject);
console.log(dateFormat(new Date(),'W MMMM DDDD YYYY HH:MM:ss'));
// Mon Jan 30 2017 19:54:02
```

&copy; AngusYoung

E-mail: <angusyoung@mrxcool.com>

Home: http://mrxcool.com