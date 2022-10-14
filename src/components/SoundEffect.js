import Sound from 'react-sound';

const SoundEffect = props => < Sound url={props.effect} playStatus={Sound.status.PLAYING} />;

export default SoundEffect;