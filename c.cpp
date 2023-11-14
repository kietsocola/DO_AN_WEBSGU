#include <iostream>
using namespace std;

struct Book {
    int book_code;
    string book_name;
    int publish_year;
    int quantity;
    float unit_price;
    float total_price;
    Book* left;
    Book* right;

    Book(int code, string name, int year, int qty, float price) {
        book_code = code;
        book_name = name;
        publish_year = year;
        quantity = qty;
        unit_price = price;
        total_price = quantity * unit_price;
        left = right = nullptr;
    }
};

class BookBinarySearchTree {
private:
    Book* root;

    Book* _insert(Book* root, int code, string name, int year, int qty, float price) {
        if (!root) {
            return new Book(code, name, year, qty, price);
        }

        if (code < root->book_code) {
            root->left = _insert(root->left, code, name, year, qty, price);
        }
        else if (code > root->book_code) {
            root->right = _insert(root->right, code, name, year, qty, price);
        }
        else {
            // Sách có mã trùng, cập nhật thông tin
            root->quantity += qty;
            root->unit_price = price;
            root->total_price = root->quantity * root->unit_price;
        }

        return root;
    }

    Book* _search(Book* root, int code) {
        if (!root || root->book_code == code) {
            return root;
        }

        if (code < root->book_code) {
            return _search(root->left, code);
        }
        else {
            return _search(root->right, code);
        }
    }

    void _displayInOrder(Book* root) {
        if (root) {
            _displayInOrder(root->left);
            cout << "Book Code: " << root->book_code << ", "
                 << "Book Name: " << root->book_name << ", "
                 << "Publish Year: " << root->publish_year << ", "
                 << "Quantity: " << root->quantity << ", "
                 << "Unit Price: " << root->unit_price << ", "
                 << "Total Price: " << root->total_price << endl;
            _displayInOrder(root->right);
        }
    }

public:
    BookBinarySearchTree() : root(nullptr) {}

    void insert(int code, string name, int year, int qty, float price) {
        root = _insert(root, code, name, year, qty, price);
    }

    Book* search(int code) {
        return _search(root, code);
    }

    void displayInOrder() {
        _displayInOrder(root);
    }
};

int main() {
    BookBinarySearchTree bookTree;

    int choice;
    do {
        cout << "\nMenu:\n";
        cout << "1. Nhập danh sách gồm n cuốn sách\n";
        cout << "2. Tính thành tiền\n";
        cout << "3. Tìm sách có mã sách là X\n";
        cout << "4. Thoát\n";
        cout << "Chọn chức năng: ";
        cin >> choice;

        switch (choice) {
            case 1: {
                int n;
                cout << "Nhập số lượng sách (n): ";
                cin >> n;

                for (int i = 0; i < n; ++i) {
                    int code, year, qty;
                    float price;
                    string name;

                    cout << "Nhập thông tin sách thứ " << i + 1 << ":\n";
                    cout << "Mã sách: ";
                    cin >> code;
                    cout << "Tên sách: ";
                    cin.ignore(); // Xóa bộ đệm cho getline
                    getline(cin, name);
                    cout << "Năm xuất bản: ";
                    cin >> year;
                    cout << "Số lượng: ";
                    cin >> qty;
                    cout << "Đơn giá: ";
                    cin >> price;

                    bookTree.insert(code, name, year, qty, price);
                }

                cout << "Danh sách sách đã được nhập!\n";
                break;
            }

            case 2: {
                // Tìm sách theo mã sách
                int searchCode;
                cout << "Nhập mã sách cần tìm: ";
                cin >> searchCode;

                Book* searchResult = bookTree.search(searchCode);
                if (searchResult) {
                    cout << "Sách có mã " << searchCode << " là: " << searchResult->book_name << endl;
                } else {
                    cout << "Không tìm thấy sách có mã " << searchCode << endl;
                }
                break;
            }
            case 3:
                cout << "Kết thúc chương trình\n";
                break;
            default:
                cout << "Chức năng không hợp lệ. Vui lòng chọn lại.\n";
                break;
        }
    } while (choice != 3);

    return 0;
}
