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

  fidelity = 33 - ((fidelity * 16) | 0);

  method = s => s? s.charCodeAt(0): s;

  array.forEach((value, index, self = this) =>
    (value == '')?
      self.splice(index, 1):
    gamma += value.charCodeAt(0)
  );

  for(let index = 0, length = array.length, last = length - 1; index < length; index++)
    for(let self = array[index], next = (array[index + 1] || ""), mirror = array[last], a, b, c, d, e, f, g = gamma, i = 0, j = self.length, k = mirror.length, l = length, m = k - 1, q = fidelity; i < j; ++i, --m, g = gamma += a + b + c + d + e + f)
      a = method(self[i])         | 0,
      b = method(self[j - i - 1]) | 0,
      c = method(mirror[m])       | 0,
      d = method(mirror[k - m])   | 0,
      e = method(next[i])         | 0,
      f = method(next[m])         | 0,
      result.push(Math.abs(
        (((a ^ ~b) << (i + k)) |  (j & e) | g) ^
        (((b | -c) ^  (m + j)) |  (j & f) | g) ^
        (((c & ~d) << (e - k)) >> (k ^ q) + g) ^
        (((d << a) ^  (f - j)) >> (k ^ q) + g) ^

        ((a & b | c ^ d) ^ e - f) << (q & e & f)
      ));

  result.splice(fidelity, result.length - fidelity);
  base = (gamma % 20) + 16;

  result.forEach((value, index, self) => self.splice(index, 1, (value ^ gamma).toString(base)));

  string = result = result.join('').slice(0, 256);
  gamma = gamma.toString(base);
  base = (base * fidelity).toString(base);

  return R(result) + base + gamma;
};
