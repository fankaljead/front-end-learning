type T = 1 | 2 | 3;

function add<T>(a: T, b: T): T {
  return (a + b) as number;
}

type Job = 'doctor' | 'student';
