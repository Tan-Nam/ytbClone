## SCSS convention

1.  Biến id hoặc class bọc tất cả các thẻ trong cùng một component phải có tên giống với tên file hoặc tên file + '-container'.
2.  Ưu tiên nesting để có thể tái sử dụng biến ở chỗ khác.
3.  Các thẻ trong file scss cách nhau 1 empty line.
4.  Sub component chỉ có component cha của chính nó dùng thì để vào trong folder của component cha.
5.  import scss file phải được để dưới cùng trong section import ở mỗi component.
6.  Các class và id ở trong các lớp container sẽ đươc đặt theo quy tắc BEM.
7.  Biến không đặt theo quy tắc SCSS mà đặt theo quy tắc CSS.

## Coding convention

1. Trong mỗi component sẽ gồm 3 section cách nhau bởi '//'.
   - Section variable
   - Section logic default function
   - Section arrow function which is return JSX element
2. Đối với API query folder, mỗi Enity sẽ có 2 hành động:
   - List: query toàn bộ item theo filter
   - Item: query một item theo id
3. Đối với API command folder, mỗi Enity sẽ có 2 hành động:
   - Add: Post một item
   - Update: Put một item
4. Các funtion được cách nhau bởi empty line.
5. Mỗi hàng chỉ tối đã 120 ký tự - formater prettier lo việc này.
6. Tên component được đặt đúng nhất với context của chức năng.
7. Hạn chế đặt tên index trong các sub component để tiện cho việc debug. Các file index chỉ được tạo ở các root folder nằm trong src folder nhắm export các component con đi nơi khác.
8. Quy tắc đặt tên biến, tên hàm:
   - Tên biến phải ánh xạ đến các chức năng
   - Không sử dụng '\_' mà viết hoa chữ cái đầu các chữ
   - handle + 'tên biến' đối với hàm làm thay đổi state
9. Không khai báo type hoặc interface ở trong component. Import tất cả type từ model folder.
