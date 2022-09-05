import dayjs from "dayjs";

export default function sumDate(){
    const dateSum = dayjs().add(5, 'y');
    const summedDate = dayjs(dateSum).format('MM/YY');
    return summedDate;
}