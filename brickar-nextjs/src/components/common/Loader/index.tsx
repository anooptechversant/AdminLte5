const Loader = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="size-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
