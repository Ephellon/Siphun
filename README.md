# Siphun (Signature Function)
Designed to be a near-perfect hashing algorithm.

## Why?
The belief behind creating Siphun was that hashing tables shouldn't be a fixed length, but should instead have a variable length with a set maximum size. E.g. [MD5](https://www.ietf.org/rfc/rfc1321.txt) has a fixed length of sixteen 8-bit characters (32 hexadecimal characters), a maximum hash table size of 16<sup>32</sup> (340 undecillion<sup>1A</sup>) entries; while Siphun on the other hand, can have a length between 3 hexadecimal characters (empty string = **016**), and 256 alphanumeric characters (lowercase), providing a staggering [266 vigin-trillion](https://latex.codecogs.com/png.latex?%5Cdpi%7B150%7D%20%5Cbg_white%20%5Clarge%201%20&plus;%20%5Csum_%7Ba%3D1%7D%5E%7B256%7D%20%5Csum_%7Bb%3D16%7D%5E%7B36%7D%20b%5Ea)<sup>1B</sup> possible table entries.

----

## Testing
You can use the following code to test Siphun's fidelity output. Be sure to compile/append [siphun.js](siphun.js) first.

```javascript
// Siphun - unit testing
function test(string, ...fidels) {
  var s = string, f = fidels,
      q = '\u00b7', Q = '=',
      S = [], T = [], X = Siphun;

  var c = n => (n + 10).toString(36).toUpperCase().split('').reverse().join(''),
      a = n => (() => {});

  for(var i = 0, j, l = f.length; i < l;)
    S.push(X(s, f[i++]));

  for(i = 0; i < l; i++)
    for(j = i + 1; j < l; j++)
      T.push((function(A, B, C) {
        for(var x = 0, t = '', n = 0, k = A.length, m = B.length, l, u; x < k || x < m; x++)
          A = (q.repeat(m) + A).slice(-(k > m? k: m)),
          B = (q.repeat(m) + B).slice(-(k > m? k: m)),
          t += ( (u = A[x] == B[x])? A[x]: q ),
          n += +u;
        return `\n${C[0] = c(C[0])} vs ${C[1] = c(C[1])}: Likeness ${(100*(l=n/m))|0}% / char-count ${k}:${m} / Strength ${100-(l*(k+m))|0}%\n${C[0]} > ${A}\n${C[1]} > ${B}\n    ${Q.repeat(x)}\n    ${t}`;
      })(S[i], S[j], [i, j]));

  for(i = 0; i < T.length; i++)
    console.log(T[i]);
}
```

----

## Notes

+ 1A) MD5: **340,282,366,920,938,463,463,374,607,431,768,211,456**
+ 1B) Siphun: **266,683,066,789,469,258,497,647,949,142,213,022,551,159,626,626,691,307,750,616,461,182,161,817,566,910,286,233,732,911,130,911,935,051,069,280,070,768,383,514,583,647,127,112,413,713,937,441,846,050,018,161,125,771,682,172,963,628,853,185,807,181,758,974,761,779,134,604,051,543,641,094,610,614,391,668,250,496,244,833,601,914,991,506,599,946,821,115,352,140,916,055,224,972,376,724,360,450,048,348,560,347,827,991,696,473,462,897,149,632,286,215,282,118,562,704,911,206,947,971,052,426,288,340,500,057,576,373,977,473,707,655,771**
