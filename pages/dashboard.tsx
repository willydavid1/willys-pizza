import axios from "axios";
import { useEffect, useState } from "react";
import { store as storeNotifications } from "react-notifications-component";
import Loader from "components/loader";
import { Bar } from 'react-chartjs-2';
import { ISale } from 'pages/api/dashboard'
import 'chartjs-adapter-date-fns';

type TState = {
  data: Array<ISale>;
  isLoading: boolean;
  error: null | any;
}

const DashboardPage = () => {
  const [state, setState] = useState<TState>({
    data: [],
    isLoading: false,
    error: null,
  });

  const getData = async () => {
    setState({ ...state, isLoading: true });
    try {
      const { data: dataRes } = await axios.get("/api/dashboard");
      setState({ ...state, data: dataRes.sales, isLoading: false, error: null });
    } catch (error) {
      setState({ ...state, isLoading: false, error });
      storeNotifications.addNotification({
        title: "Error fetching data",
        message: "=(",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };

  const generateDataChart = (data: Array<ISale>) => {
    const dataNormalized = data.map((elem: ISale) => ({
      date: elem.sale_details.date,
      value: elem.sale_details.total_price
    }))
    return ({
      labels: dataNormalized.map((elem) => elem.date),
      datasets: [
        {
          label: 'Pizzas Sold',
          data: dataNormalized.map((elem) => elem.value),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    })
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="p-2 text-center text-xl bg-yellow-400 text-white">
        Pizzas Sold
      </h1>
      <div>
        {state.isLoading && <Loader />}
        {(!state.isLoading && !state.error) && (
          <>
            <Bar type="Bar" data={generateDataChart(state.data)} options={options} />
            <div className="max-h-96 overflow-auto my-10 border">
              <table className="table-auto">
                <thead>
                  <tr className="sticky top-0 bg-white">
                    <th className="border whitespace-nowrap p-3">Kind of food</th>
                    <th className="border whitespace-nowrap p-3">Date</th>
                    <th className="border whitespace-nowrap p-3">phone_number</th>
                    <th className="border whitespace-nowrap p-3">pizza_name</th>
                    <th className="border whitespace-nowrap p-3">total_items_selected</th>
                    <th className="border whitespace-nowrap p-3">total_price</th>
                    <th className="border whitespace-nowrap p-3">user_name</th>
                    <th className="border whitespace-nowrap p-3">ingredients_selected</th>
                    <th className="border whitespace-nowrap p-3">ingredients_that_were_removed_after_selection</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    state.data.map((elem, index) => (
                      <tr key={index}>
                        <td className="border p-3 whitespace-nowrap text-center">{elem.kind_of_food}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{elem.sale_details.date}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{elem.sale_details.phone_number}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{elem.sale_details.pizza_name}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{elem.sale_details.total_items_selected}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{elem.sale_details.total_price}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{elem.sale_details.user_name}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{JSON.stringify(elem.sale_details.ingredients_selected)}</td>
                        <td className="border p-3 whitespace-nowrap text-center">{JSON.stringify(elem.sale_details.ingredients_that_were_removed_after_selection)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
