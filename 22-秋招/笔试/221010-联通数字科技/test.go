package main

import ("fmt" "time")

func main() {
	go Print(2)
	go Print(3)
	fmt.Print("1")
	time.Sleep(time.Second)
}

func Print(a int) {
	fmt.Print(a)
}