interface PlayProps {
  name: string
}

export const Play: React.FC<PlayProps> = ({name}) => {

  return (
    <h1>Hello {name}</h1>
  );
};