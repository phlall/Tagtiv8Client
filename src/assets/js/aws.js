const AWS = require("aws-sdk");
var rscBucketName = "tagtivate.resources";

// AWS.config.update({
//   accessKeyId: "Your Key Goes Here",
//   secretAccessKey: "Your Secret Key Goes Here",
// });
//let s3 = new AWS.S3();

function config() {
  var rscBucketRegion = "eu-west-2";
  var rscIdentityPoolId = "eu-west-2:3400da04-b3ee-491f-b5b8-21f6af9c3e52";

  AWS.config.update({
    region: rscBucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: rscIdentityPoolId,
    }),
  });

  var s3 = new AWS.S3({ apiVersion: "latest" });
  return s3;
}

// async function getImage() {
//   var s3 = config();
//   const data = s3
//     .getObject({
//       Bucket: rscBucketName,
//       Key: "Tag Orienteering Maths.pdf",
//     })
//     .promise();
//   return data;
// }

const GetFile = {
  from(remoteName) {
    var s3 = config();
    const filePath = remoteName.trim();
    //const filePath = "cognito/" + remoteName.trim();
    //const filePath = remoteName.trim();
    //const filePath = remoteName;
    var headParams = {
      Bucket: rscBucketName,
      Key: filePath,
    };

    var params = {
      Bucket: rscBucketName,
      Key: filePath,
      Expires: 60,
    };

    return new Promise((resolve, reject) => {
      try {
        s3.headObject(headParams, function (err) {
          if (err) {
            reject(err);
          } else {
            s3.getSignedUrl("getObject", params, (err, url) => {
              if (err) reject(err);
              else resolve(url);
            });
          }
        });
      } catch (e) {
        reject(e.message);
      }
    });
  },
};

export { GetFile };
