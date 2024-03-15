import { useEffect } from "react";
import { useSelector } from "react-redux";
import historyUtils from "../libs/history.utils";
import RouteName from "../routes/Route.name";

const useSubscriber = (title) => {
  const { subscribed_to = [] } = useSelector((state) => state.app_setting);
  useEffect(() => {
    if (
      title &&
      Array.isArray(subscribed_to) &&
      subscribed_to?.indexOf(title) < 0
    ) {
      historyUtils.replace(RouteName.SUBSCRIBE_PAGE, {
        page: title,
      });
    }
  }, [title, subscribed_to]);
  return {};
};

export default useSubscriber;
