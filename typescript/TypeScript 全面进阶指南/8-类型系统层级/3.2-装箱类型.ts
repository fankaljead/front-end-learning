type Result14 = string extends String ? 1 : 2;
type Result15 = String extends {} ? 1 : 2;

type Result16 = {} extends object ? 1 : 2;
type Result18 = object extends Object ? 1 : 2;

type Result17 = Function extends {} ? 1 : 2;
type Result20 = Object extends object ? 1 : 2;

type Result19 = Object extends {} ? 1 : 2;
type Result21 = {} extends Object ? 1 : 2;

type string_extends_object = string extends object ? 1 : 2;
