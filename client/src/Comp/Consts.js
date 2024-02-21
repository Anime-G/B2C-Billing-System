export const HomeNavkey='Home'
export const LoginNavkey='Login'
export const UserNavKey='user'
export const ProfileNavKey='profile'
export const LogoutNavKey='Logout'
export const FormAddNavkey='FormAdd'
export const GoodsAddNavkey='GoodsAdd'
export const FormsEditNavkey='FormsEdit'
export const BillsNavkey='Bills'
export const AddBillsNavkey='AddBills'
export const ShowBillsNavkey='SeeBill'
export const ServerApi="http://localhost:5000";
export function convertAmountToWords(amount) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

    const convertThreeDigit = num => {
        let words = '';
        const hundred = Math.floor(num / 100);
        const remainder = num % 100;

        if (hundred !== 0) {
            words += units[hundred] + ' Hundred ';
        }

        if (remainder !== 0) {
            if (remainder < 10) {
                words += units[remainder];
            } else if (remainder < 20) {
                words += teens[remainder - 10];
            } else {
                words += tens[Math.floor(remainder / 10)] + ' ' + units[remainder % 10];
            }
        }

        return words.trim();
    };

    if (amount === 0) {
        return 'Zero Rupees Only';
    }

    let words = '';
    let chunkIndex = 0;

    while (amount > 0) {
        const chunk = amount % 1000;
        if (chunk !== 0) {
            words = convertThreeDigit(chunk) + ' ' + thousands[chunkIndex] + ' ' + words;
        }
        amount = Math.floor(amount / 1000);
        chunkIndex++;
    }

    return words.trim() + ' Rupees Only';
}