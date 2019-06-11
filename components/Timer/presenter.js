import react, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Button from "../Button";

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  if (minutes < 10) minutes = `0` + minutes;
  if (second < 10) second = `0` + second;
  return `${minutes}:${second}`;
}

class Timer extends Component {
  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    if (currentProps.isPlaying === false && nextProps.isPlaying === true) {
      const timerInterval = setInterval(() => {
        currentProps.addSecond();
      }, 1000);
      this.setState({
        timerInterval
      });
    } else if (
      currentProps.isPlaying === true &&
      nextProps.isPlaying === false
    ) {
      clearInterval(this.state.timerInterval);
    }
  }
  render() {
    const {
      isPlaying,
      elapsedTime,
      timeDuration,
      startTimer,
      restartTimer,
      addSecond
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.upper}>
          <Text style={styles.time}>
            {formatTime(timeDuration - elapsedTime)}
          </Text>
        </View>
        <View style={styles.lower}>
          {!isPlaying ? (
            <Button iconName="play-circle" onPress={startTimer} />
          ) : null}
          {isPlaying ? (
            <Button iconName="stop-circle" onPress={restartTimer} />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CE0B24"
  },
  upper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  lower: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  time: {
    color: "white",
    fontSize: 120,
    fontWeight: "100"
  }
});

export default Timer;
