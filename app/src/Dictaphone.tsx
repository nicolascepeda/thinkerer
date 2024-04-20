import { useWhisper } from '@chengsokdara/use-whisper';
import { useEffect, useState } from "react";

const Dictaphone = ({
  setText,
  isSubmitting,
}: {
  setText: Function;
  isSubmitting: boolean;
}) => {
  const {
    recording,
    //speaking, transcribing, //pauseRecording,
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.REACT_APP_WHISPER_API_KEY,
    removeSilence: true,
    whisperConfig: {
      language: 'en',
      temperature: 0.0
    },
  })

  useEffect(() => {
    if (!transcript?.text) return;
    setText(transcript.text!);
  }, [transcript]);

  const toggle = (evt: any) => {
    evt.preventDefault();
    recording ? stopRecording() : startRecording()
  }

  return (
    <>
      <button className={"ml-2 p-2 text-black rounded-full " + (recording ? 'bg-red-400' : 'brand-bg')} disabled={isSubmitting} onClick={(evt: any) => toggle(evt)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>

      </button>
    </>
  );
};
export default Dictaphone;
