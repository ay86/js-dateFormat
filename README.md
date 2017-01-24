#JavaScript Date Format

通过格式规则对日期时间的数据进行格式化，显示更加友好并且自由组合的方式。

eg.

	yyyy-mm-dd  => 2017-01-24
	mm/dd/yyyy  => 01/24/2017
	YYYY        => 二〇一七     （中文年）
	w           => 二          （中文周几）
	HH:MM:ss    => 16:24:56    （24小时制）
	hh:MM:ss    => 04:24:56    （12小时制）
	
###Usage

```js
var dateFormat = require('dataFormat');
var dateString = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
// 2017/01/24 16:24:56
```
###特殊的格式规则`Ln-`

n 表示从1到6的级别，各自对应：秒，分钟，小时，天，月，年

使用此格式表示对于小于等于指定级别的时间将显示为近时值，比如当前时间为2017年1月24日16点32分，
如果将2017年1月24日16时30分的日期用`L2-yyyy/mm/dd`格式规则进行转换那么得出的结果是显示`2分钟前`，如果我们将 L2 改成 L1 那么此处将会按后面的`yyyy-mm-dd`显示`2017/01/24`。

通过这个规则可以让你轻松获得 多少秒前、多少分钟前 的友好体验，并且不用担心时间近值超过级别之后会被显示成比如 26小时前 这种乌龙日期。

eg.

```js
var dateFormat = require('dateFormat');
var dateString = dateFormat(new Date('2017/01/24 16:30'), 'L2-yyyy-mm-dd');
// 2分钟前 or 2017-01-24
```

&copy; AngusYoung

E-mail <angusyoung@mrxcool.com>

Home (http://mrxcool.com)