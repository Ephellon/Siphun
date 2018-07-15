/** Siphun - hashing algorithm
 * @author Ephellon Dantzler (Cliffton E.D. Tucker)
 */

function Siphun(string, fidelity) {
  var array = (string += '').split(/([^]{16})/),
      gamma = 0,
      base,
      method;

  fidelity = 33 - (((fidelity || 0) * 16) | 0);

  method = function(s) {
    return s? s.charCodeAt(0): s;
  };

  array.forEach(function(value, index, self) {
    return (value == "")?
      self.splice(index, 1):
    gamma += value.charCodeAt(0);
  });

  for(var index = 0, length = array.length, last = length - 1, result = []; index < length; index++)
    for(var self = array[index], next = (array[index + 1] || ""), mirror = array[last], a, b, c, d, e, f, g = gamma, i = 0, j = self.length, k = mirror.length, l = length, m = k - 1, q = fidelity; i < j; ++i, --m, g = gamma += a + b + c + d + e + f)
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
  base = ((gamma % 20) + 16);

  result.forEach(function(value, index, self) {
    return self.splice(index, 1, (value ^ gamma).toString(base));
  });

  string = result = result.join("").slice(0, 256);

  return result + gamma.toString(base) + base;
};
