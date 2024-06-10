import DatePicker from "react-multi-date-picker";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import { locale } from "../Plugins/locale";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./style.scss";
import { useEffect, useMemo, useState } from "react";
import { addDays, subDays, format } from "date-fns";

const COptimizedRangePicker = ({ onChange = () => {}, value, placeholder }) => {
  const [selectedDate, setSelectedDate] = useState([]);
  const [formatedDays, setFormatedDays] = useState({});

  const changeHander = (date) => {
    let start = date?.[0]
      ? `${date[0].year}-${date[0].month.number}-${date[0].day}`
      : undefined;
    let end = date[1]
      ? `${date[1].year}-${date[1].month.number}-${date[1].day}`
      : undefined;

    setFormatedDays({ start, end });

    setSelectedDate(date);
  };

  const handleForwardClick = () => {
    const currentTime = formatedDays.end
      ? formatedDays.end
      : formatedDays.start;
    const nextDay = addDays(new Date(currentTime), 1);

    if (formatedDays.end) {
      setFormatedDays({ ...formatedDays, end: format(nextDay, "yyyy-MM-dd") });
    } else {
      setFormatedDays({
        start: format(nextDay, "yyyy-MM-dd"),
      });
    }

    setSelectedDate([]);
  };

  const handleBackwardClick = () => {
    const currentTime = formatedDays.start
      ? formatedDays.start
      : formatedDays.end;
    const prevDay = subDays(new Date(currentTime), 1);

    if (formatedDays.end) {
      setFormatedDays({
        start: format(prevDay, "yyyy-MM-dd"),
        end: formatedDays.end,
      });
    } else {
      setFormatedDays({
        start: format(prevDay, "yyyy-MM-dd"),
      });
    }
    setSelectedDate([]);
  };

  const months = useMemo(() => {
    return [
      "",
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "декабря",
    ];
  }, []);

  const Day = useMemo(() => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    let result = "Сегодня";
    if (formatedDays.start && formatedDays.end) {
      let dayStart = formatedDays.start.split("-")[2];
      let dayEnd = formatedDays.end.split("-")[2];
      let monthStart = formatedDays.start.split("-")[1];
      let monthEnd = formatedDays.end.split("-")[1];

      if (monthStart.charAt(0) === "0") monthStart = monthStart.substring(1);
      if (monthEnd.charAt(0) === "0") monthEnd = monthEnd.substring(1);

      result = `${dayStart} ${months[parseInt(monthStart)]} - ${dayEnd} ${
        months[parseInt(monthEnd)]
      }`;
    } else if (formatedDays.start && !formatedDays.end) {
      let dayStart = formatedDays.start.split("-")[2];
      let monthStart = formatedDays.start.split("-")[1];

      if (formatedDays.start === fullDate) {
        result = "Сегодня";
      } else result = `${dayStart} ${months[parseInt(monthStart)]}`;
    }

    return result;
  }, [formatedDays, months]);

  useEffect(() => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    if (!formatedDays.start) {
      setFormatedDays({ start: fullDate });
    }
  }, [formatedDays]);

  return (
    <div className="COptimizedRangePicker">
      <DatePicker
        render={(selectedDate, openCalendar, handleChange) => (
          <div className="wrapper">
            <div className="leftBtn" onClick={() => handleBackwardClick()}>
              <ArrowBackIos style={{ color: "white" }} />
            </div>
            <div className="textF" onClick={openCalendar}>
              {Day}
            </div>
            <div className="rightBtn" onClick={() => handleForwardClick()}>
              <ArrowForwardIos style={{ color: "white" }} />
            </div>
          </div>
        )}
        range
        // renderButton={<CustomNavButton />}
        // animations={[opacity()]}
        plugins={[weekends()]}
        weekStartDayIndex={1}
        portal
        locale={locale}
        className="datePicker"
        format="DD.MM.YYYY"
        numberOfMonths={2}
        onChange={(val) => {
          changeHander(val);
        }}
        value={Object.values(selectedDate ?? {})}
        // onChange={(val) => onChange(val ? new Date(val) : "")}
      />
    </div>
  );
};

export default COptimizedRangePicker;
