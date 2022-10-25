enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}

const home = PageUrl.Home_Page_Url;

enum Items {
  Foo,
  Bar,
  Baz,
}

enum Items2 {
  Foo,
  Bar = 300,
  Baz,
}

const returnNum = () => 100 + 199;
enum Items3 {
  Foo = returnNum(),
  Bar = 299,
  Baz,
}

enum Mixed {
  Num = 600,
  Str = "zxh",
}

enum Itemm {
  Foo,
  Bar,
  Baz,
}
const fooValue = Itemm.Foo;
const fooKey = Itemm[0];
const foolKey = Items3[2];
