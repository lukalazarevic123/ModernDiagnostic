import cv2
import os
import tensorflow
from tensorflow import keras
from PIL import Image
import numpy
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Activation, Dropout, Flatten, Dense

img_dir = 'datasets/'

no_tumor_imgs = os.listdir(img_dir + 'no/')
yes_tumor_imgs = os.listdir(img_dir + 'yes/')
dataset = []
label = []

INPUT_SIZE = 64

for i, img_name in enumerate(no_tumor_imgs):
    if(img_name.split('.')[1]=='jpg'):
        img = cv2.imread(img_dir+'no/'+img_name)
        img = Image.fromarray(img, 'RGB')
        img = img.resize((INPUT_SIZE, INPUT_SIZE))
        dataset.append(numpy.array(img))
        label.append(0) #corresponding to the member of dataset(0 as in NO tumor)

for i, img_name in enumerate(yes_tumor_imgs):
    if(img_name.split('.')[1]=='jpg'):
        img = cv2.imread(img_dir+'yes/'+img_name)
        img = Image.fromarray(img, 'RGB')
        img = img.resize((INPUT_SIZE, INPUT_SIZE))
        dataset.append(numpy.array(img))
        label.append(1)

dataset = numpy.array(dataset)
label = numpy.array(label)

x_train, x_test, y_train, y_test = train_test_split(dataset, label, test_size=0.2, random_state=0) #80% train 20% test

# print(x_train.shape) # (n, img_width, img_height, n_channel)
# print(y_train.shape)

x_train = keras.utils.normalize(x_train, axis = 1)
x_test = keras.utils.normalize(x_test, axis = 1)

#Model Building

model = Sequential()

model.add(Conv2D(32, (3, 3), input_shape = (INPUT_SIZE, INPUT_SIZE, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size = (2, 2)))

model.add(Conv2D(32, (3, 3), kernel_initializer='he_uniform'))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size = (2, 2)))

model.add(Conv2D(64, (3, 3), kernel_initializer='he_uniform'))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size = (2, 2)))

model.add(Flatten())
model.add(Dense(64))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(1))#binary classification either yes or no
model.add(Activation('sigmoid'))

model.compile(loss = 'binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(x_train, y_train,
          batch_size=20,
          verbose = 1,
          epochs = 20,
          validation_data = (x_test, y_test),
          shuffle = False)

model.save('BrainTumor20Epochs.h5')