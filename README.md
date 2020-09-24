# custom-timestamps
A Powercord plugin that displays custom timestamps on messages.

# Date Variables (to be added to plugin settings page)
```
(reference time: 2020-09-23 7:06:54 PM)
%Y = full year (e.g 2020)
%M = month (e.g 9)
%D = date (e.g 23)
%H = hour (12 hour format) (e.g 7)
%h = hour (24 hour format) (e.g 19)
%m = minute (e.g 6)
%s = second (e.g 54)
%a = time period in 12 hour time formats, without the M (e.g p) (p.s You can use %am for the full ending)
%A = same as last line, but capital (e.g P)

Values that vary between one digit and two can be given a zero after the percent symbol to add a zero if there isn't one. (e.g %0M results in 09 instead of simply %M, which results in just 9)
```
