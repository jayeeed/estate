const ImageViewer = ({ imageUrl }) => {
    const [imageData, setImageData] = useState(null);
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          const response = await axios.get(`{imageUrl}`, {
            responseType: 'arraybuffer',
          });
  
          const data = Buffer.from(response.data, 'binary').toString('base64');
          setImageData(`data:${response.headers['content-type']};base64,${data}`);
        } catch (error) {
          console.error('Error retrieving image:', error);
        }
      };
  
      if (imageId) {
        fetchImage();
      }
    }, [imageId]);
  
    return <img src={imageData} alt="Uploaded" />;
  };