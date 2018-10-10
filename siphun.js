/** Siphun - hashing algorithm
 * @author Ephellon Dantzler (Cliffton E.D. Tucker)
 */

function Siphun(string = '', fidelity = 0) {
  let array = (string += '').split(/([^]{256})/),
      gamma = 0,
      result = [],
      method,
      base;

  let R = (t = '') => {
    let s = [], S = [], N = 256, l = t.length;

    if(!l)
      return '';
    else
      t = ' ' + t;

    for(let n = 0; n < N;)
      s.push(n++);

    for(let n = 0, x = n, w = x; n < N; n++) {
      x = (x + s[n] + t.charCodeAt(n % l)) % N;
      s[w] = s[n];
      s[n] = s[x];
      s[x] = s[w];
    }

    for(let n = -1; n < N; n++)
      S.push(t[s[n]] || '');

    return S.join('');
  };

  fidelity = 2 + ((fidelity * 14) | 0);

  method = s => s? s.charCodeAt(0): s;

  array.forEach((value, index, self = this) =>
    (value == '')?
      self.splice(index, 1):
    gamma += (value.charCodeAt(0) % 13) | 0
  );

  for(let index = 0, length = array.length, last = length - 1; index < length; index++)
    for(let self = array[index], next = (array[index + 1] || ""), mirror = array[last], a, b, c, d, e, f, g = gamma, i = 0, j = self.length, k = mirror.length, l = length, m = k - 1, q = fidelity; i < j; ++i, --m, g = gamma += a + b + c + d + e + f)
      a = (method(self[i])         | 0) | 0,
      b = (method(self[j - i - 1]) - a) | 0,
      c = (method(mirror[m])       + b) | 0,
      d = (method(mirror[k - m])   ^ c) | 0,
      e = (method(next[i])         | d) | 0,
      f = (method(next[m])         ^ e) | 0,
      result.push(
        (((a ^ ~b) << (i + k)) |  (j & e) | g) ^
        (((b | -c) ^  (m + j)) |  (j & f) | g) ^
        (((c & ~d) << (e - k)) >> (k ^ q) + g) ^
        (((d << a) ^  (f - j)) >> (k ^ q) + g) ^

        ((a & b | c ^ d) ^ e - f) << (q & e & f)
      );

  result.splice(fidelity, result.length - fidelity);
  base = (((gamma || 16) % 20) + (fidelity % 16));

  result.forEach((value, index, self) => self.splice(index, 1, Math.abs(value ^ gamma).toString(base)));

  result = result.join('').slice(0, 256);
  gamma = gamma.toString(base);
  base = (base * (fidelity || 1)).toString(base);

  return R(result) + base + gamma;
};
