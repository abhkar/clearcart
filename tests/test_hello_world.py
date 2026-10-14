from pathlib import Path

HELLO = Path(__file__).resolve().parent.parent / "hello.txt"


def test_hello_file_exists():
    assert HELLO.is_file()


def test_hello_content_stripped():
    assert HELLO.read_text(encoding="utf-8").strip() == "Hello World !"


def test_hello_single_line_only():
    text = HELLO.read_text(encoding="utf-8")
    assert len(text.strip().splitlines()) == 1
    assert text.rstrip("\r\n") == "Hello World !"


def test_hello_is_plain_utf8():
    data = HELLO.read_bytes()
    data.decode("utf-8")
    assert not data.startswith(b"\xef\xbb\xbf")
    assert b"\x00" not in data
