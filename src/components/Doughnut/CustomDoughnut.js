import { Doughnut } from "react-chartjs-2";
import { fade, makeStyles, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  customDoughnut: (props) => ({
    position: "relative",
    borderRadius: "50%",
    backgroundColor: "#081C22",
    padding: props.size2 ? props.size2 : 4,
    color: 'white',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  absoluteCenter: (props) => ({
    position: "absolute",
    marginLeft: 2,
    "& > h6": {
      fontSize: props.size / 3,
      fontWeight: 'bold',
      "& > span": {
        fontSize: props.size / 7,
        verticalAlign: "text-top",
      },
    },
  }),
}));

const CustomDoughnut = ({ vote_average = 0, size, size2, rounded, offAnimation }) => {
  const classes = useStyles({ size, size2 });
  const data = {
    datasets: [
      {
        data: [vote_average, 10 - vote_average],
        backgroundColor: [
          vote_average >= 7
            ? "#21D07A"
            : vote_average >= 4
              ? "#D2D531"
              : grey[500],
          vote_average >= 7
            ? "#204529"
            : vote_average >= 4
              ? "#423D0F"
              : fade(grey[500], 0.5),
        ],
        pointHoverRadius: 5,
        borderWidth: 0,
      },
    ],
  };

  // round corners doughnut
  // Chart.pluginService.register({
  //   afterUpdate: function (chart) {
  //     if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
  //       var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
  //       arc.round = {
  //         x: (chart.chartArea.left + chart.chartArea.right) / 2,
  //         y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
  //         radius: (chart.outerRadius + chart.innerRadius) / 2,
  //         thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
  //         backgroundColor: arc._model.backgroundColor
  //       }
  //     }
  //   },
  //   afterDraw: function (chart) {
  //     if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
  //       var ctx = chart.chart.ctx;
  //       var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
  //       var startAngle = Math.PI / 2 - arc._view.startAngle;
  //       var endAngle = Math.PI / 2 - arc._view.endAngle;

  //       ctx.save();
  //       ctx.translate(arc.round.x, arc.round.y);
  //       console.log(arc.round.startAngle)
  //       ctx.fillStyle = arc.round.backgroundColor;
  //       ctx.beginPath();
  //       ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
  //       ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
  //       ctx.closePath();
  //       ctx.fill();
  //       ctx.restore();
  //     }
  //   },
  // });
  // ! round corners doughnut


  return (
    <div className={classes.customDoughnut}>
      <Doughnut
        data={data}
        width={size}
        height={size}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 87,
          animation: offAnimation ? {
            duration: 0
          } : {}
          ,
          tooltips: {
            enabled: false,
          },
          hover: {
            mode: null,
          },
          legend: {
            display: false,
          },
          elements: rounded ? {
            arc: {
              // roundedCornersFor: 0,  //nó bị vòng lặp => chạy 1 lúc là lag vãi lồn
            }
          } : {}
        }}
      />
      <div className={classes.absoluteCenter}>
        <Typography variant="subtitle2">
          {Math.round(vote_average * 10)}
          <span>%</span>
        </Typography>
      </div>
    </div>
  );
};

export default CustomDoughnut;
