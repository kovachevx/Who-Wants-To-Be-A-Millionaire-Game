import Sound from 'react-sound';

const ThemeSound = props => < Sound url={props.theme} playStatus={Sound.status.PLAYING} loop={true} volume={50} autoLoad={true} />;

export default ThemeSound;