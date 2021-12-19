import cv2
import numpy
import urllib
import sys
from keras.models import load_model
from PIL import Image

def detect_tumor():
    model = load_model('BrainTumor10Epochs.h5')
    path = urllib.request.urlopen("https://ipfs.infura.io/ipfs/" + sys.argv[1]);
    image = numpy.asarray(bytearray(path.read()), dtype = "uint8")
    image=  cv2.imdecode(image, cv2.IMREAD_COLOR)
    img = Image.fromarray(image)
    img = img.resize((64, 64))
    img = numpy.array(img)

    input_img = numpy.expand_dims(img, axis = 0)
    classes_result = model.predict(input_img)

    print (classes_result > 0)



detect_tumor()